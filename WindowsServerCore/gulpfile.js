const gulp = require('gulp');
const del = require('del');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const argv = require('yargs').argv;

const version = '0.1.0';
const dockerFilePath = path.join(process.cwd(), 'Dockerfile');
const dockerTag = argv.dockertag || `${version}`;
const repositoryName = 'zhangsiy/win-core-dev';

const imageTag = `${repositoryName}:${dockerTag}`;

// ========================= Task Definitions ======================================

gulp.task('docker:compile-image', [], ()=>
	spawn('docker', ['build', '-t', imageTag, '-f', dockerFilePath, '.'], {stdio:'inherit'})
	.then(() => spawn('docker', ['image', 'prune', '-f'], {stdio:'inherit'}))
);

gulp.task('docker:push', ['docker:compile-image', 'docker:login'], ()=>
	spawn('docker', ['push', imageTag], {stdio:'inherit'})
);

gulp.task('docker:login', [], ()=>
	spawn('docker', ['login', '--username', argv.username, '--password', argv.password], {stdio:'inherit'})
);

gulp.task('docker:clear-images', () => 
	spawn('docker', ['image', 'prune', '-f'], {stdio:'inherit'})
);
