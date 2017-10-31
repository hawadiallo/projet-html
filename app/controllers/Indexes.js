'use strict';

const Docker = require('dockerode');

/* Create instance docker module */
let docker = new Docker();

let Indexes = {

    index : (req, res) => {
        /* Get all containers */
        docker.listContainers(function (err, containers) {
            if (containers.length === 0) {
                /* Render view with variables */
                res.render('Indexes/index', {
                    title: 'Manage Docker'
                });
            } else {
                // /* Render view with variables */
                res.render('Indexes/index', {
                    title: 'Manage Docker',
                    containers : containers
                });
            }
        });
    },

    create : (req, res) => {
        /* Create container with instance */
        docker.createContainer({
            Image: 'ubuntu:16.04',
            name: req.body.name,
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
            OpenStdin: false,
            StdinOnce: false
        }).then(function(container) {
            let container_current = docker.getContainer(container.id);
            container_current.start((err, data) => {
                res.redirect('/');
            });
        }).catch(function(err) {
            console.log(err);
        });

    }

}

module.exports = Indexes;
