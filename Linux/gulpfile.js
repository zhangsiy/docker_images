const gulp = require('gulp');
const del = require('del');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const exec = require('child-process-promise').exec;
const argv = require('yargs').argv;

const version = '0.1.0';
const dockerFilePath = path.join(process.cwd(), 'Dockerfile');
const dockerTag = argv.dockertag || `${version}`;

const repositoryName = 'zhangsiy/linux-dev';
const imageTag = `${repositoryName}:${dockerTag}`;

const region = argv.region || 'us-east-1';
const ecrRepositoryName = '119381170469.dkr.ecr.us-east-1.amazonaws.com/linux-dev';
const ecrImageTag = `${ecrRepositoryName}:${dockerTag}`;

// ========================= Task Definitions ======================================

gulp.task('docker:compile-image', [], ()=>
	spawn('docker', ['build', '-t', imageTag, '-f', dockerFilePath, '.'], {stdio:'inherit'})
	.then(() => spawn('docker', ['image', 'prune', '-f'], {stdio:'inherit'}))
);

gulp.task('docker:login', [], ()=>
	spawn('docker', ['login', '--username', argv.username, '--password', argv.password], {stdio:'inherit'})
);

gulp.task('docker:push', ['docker:compile-image', 'docker:login'], ()=>
	spawn('docker', ['push', imageTag], {stdio:'inherit'})
);

gulp.task('docker:ecr-compile-image', [], ()=>
	spawn('docker', ['build', '-t', ecrImageTag, '-f', dockerFilePath, '.'], {stdio:'inherit'})
	.then(() => spawn('docker', ['image', 'prune', '-f'], {stdio:'inherit'}))
);

gulp.task('docker:ecr-login', [], () =>
	exec(`aws ecr get-login --no-include-email --region ${region} `)
    .then((result)=>exec(result.stdout))
);

gulp.task('docker:ecr-push', ['docker:ecr-compile-image', 'docker:ecr-login'], ()=>
	spawn('docker', ['push', ecrImageTag], {stdio:'inherit'})
);

gulp.task('docker:clear-images', () => 
	spawn('docker', ['image', 'prune', '-f'], {stdio:'inherit'})
);
