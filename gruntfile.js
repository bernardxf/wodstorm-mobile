module.exports = function(grunt) {

    // Autoload modules do package.json
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        /**
         * Pastas Padronizadas
         */
        meta: {
            development: {
                raiz: 'development/',
                fonts: 'development/fonts/',
                images: 'development/images/',
                jade: 'development/jade/',
                stylus: 'development/stylus/',
                scripts: 'development/scripts/',
                sounds: 'development/sounds/',
            },
            test: {
                raiz: 'test/',
                assets: '<%= meta.test.raiz %>/assets/',
                fonts: '<%= meta.test.raiz %>/assets/fonts/',
                images: '<%= meta.test.raiz %>/assets/images/',
                scripts: '<%= meta.test.raiz %>/assets/scripts/',
                sounds: '<%= meta.test.raiz %>/assets/sounds/',
                styles: '<%= meta.test.raiz %>/assets/styles/',
                pagesPt: {
                    raiz: '<%= meta.test.raiz %>/pages/',
                    modules: '<%= meta.test.raiz %>/pages/modules/'
                }
            },
            build: {
                raiz: 'build/www/',
                assets: '<%= meta.build.raiz %>/assets/',
                fonts: '<%= meta.build.raiz %>/assets/fonts/',
                images: '<%= meta.build.raiz %>/assets/images/',
                scripts: '<%= meta.build.raiz %>/assets/scripts/',
                styles: '<%= meta.build.raiz %>/assets/styles/',
                sounds: '<%= meta.build.raiz %>/assets/sounds/',
                pages: {
                    raiz: '<%= meta.build.raiz %>/pages/',
                    modules: '<%= meta.build.raiz %>/pages/modules/'
                }
            },
            resources: {
                raiz: 'resources/',
                images: 'resources/images/',
                imagesFlat: 'resources/imagesFlat/'
            },
        },
        /**
         * Limpa Pastas
         */
        clean: {
            images: {
                src: ["<%= meta.test.images %>"]
            },
            test: {
                src: ["<%= meta.test.raiz %>"]
            },
            build: {
                src: ["<%= meta.build.raiz %>assets/", "<%= meta.build.raiz %>pages/"]
            },
            buildClean: {
                src: ["<%= meta.build.scripts.raiz %>/temp/"]
            }
        },
        /**
         * Criação das Imagens Minificadas para inicialização do Desenvolvimento
         */
        imagemin: {
            options: {
                optimizationLevel: 7,
                progressive: true
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.development.images %>',
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: '<%= meta.test.images %>'
                }]
            }
        },
        /**
         * Copiar alguns arquivos necessários
         */
        copy: {
            // Copiando arquivos da Build de Teste
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.development.fonts %>',
                    src: ['**'],
                    dest: '<%= meta.test.fonts %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.images %>',
                    src: ['**'],
                    dest: '<%= meta.test.images %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.scripts.raiz %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.test.scripts.raiz %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.sounds %>',
                    src: ['**/*.ogg'],
                    dest: '<%= meta.test.sounds %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.raiz %>',
                    src: ['*.xml/*.js'],
                    dest: '<%= meta.test.raiz %>'
                }]
            },
            // Copiando arquivos da Build de Produção
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.development.fonts %>',
                    src: ['**'],
                    dest: '<%= meta.build.fonts %>'
                }, {
                    expand: true,
                    cwd: '<%= meta.development.images %>',
                    src: ['**'],
                    dest: '<%= meta.build.images %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.sounds %>',
                    src: ['**/*.ogg'],
                    dest: '<%= meta.build.sounds %>'
                },{
                    expand: true,
                    cwd: '<%= meta.development.raiz %>/scripts/vendor/',
                    src: ['**'],
                    dest: '<%= meta.build.raiz %>/assets/scripts/vendor/'
                },{
                    expand: true,
                    cwd: '<%= meta.development.raiz %>',
                    src: ['*.xml/*.js'],
                    dest: '<%= meta.build.raiz %>'
                }]
            }
        },
        /**
         * Stylus CSS
         */
        stylus: {
            test: {
                options: {
                    paths: ['stylus']
                },
                files: {
                    '<%= meta.test.styles %>main.css': ['<%= meta.development.stylus %>font.styl','<%= meta.development.stylus %>main.styl']
                }
            },
            build: {
                options: {
                    paths: ['stylus']
                },
                files: {
                    '<%= meta.build.styles %>main.css': ['<%= meta.development.stylus %>font.styl','<%= meta.development.stylus %>main.styl']
                }
            }
        },
        /**
         * Compila jade para html
         */
        jade: {
            test: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.development.jade %>',
                    src: ['**/*.jade'],
                    dest: '<%= meta.test.raiz %>',
                    ext: '.html'
                }]
            },
            build: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.development.jade %>',
                    src: ['**/*.jade'],
                    dest: '<%= meta.build.raiz %>',
                    ext: '.html'
                }]
            }
        },
        /**
         * Troca includes do html
         */
        usemin: {
            html: ['<%= meta.build.raiz %>/pages/*.html', '<%= meta.build.raiz %>/pages/modules/*.html'],
            options: {
                dirs: ['<%= meta.build.raiz %>/pages/', '<%= meta.build.raiz %>/pages/modules/']
            }
        },
        /**
         * Minifica o html
         */
        htmlcompressor: {
            compile: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.build.pages.raiz %>',
                    src: ['**/*.html'],
                    dest: '<%= meta.build.pages.raiz %>',
                }],
                options: {
                    preserveServerScript: true
                }
            }
        },
        /**
         * Minifica o Javascript
         */
        uglify: {
            test: {
                files: [{
                    expand: true,
                    src: ['<%= meta.development.scripts %>/smartphone/*.js'],
                    dest: '<%= meta.test.scripts %>core.js'
                }]
            },
            build: {
                files: [{
                    src: ['<%= meta.development.scripts %>/smartphone/*.js'],
                    dest: '<%= meta.build.scripts %>core.js'
                }]
            }
        },
        /**
         * Fazendo monitoramento das modificações do codigo
         */
        watch: {
            stylus: {
                files: '<%= meta.development.stylus %>**/*.styl',
                tasks: ['stylus:test']
            },
            scripts: {
                files: '<%= meta.development.scripts %>**/*.js',
                tasks: ['copy:test']
                // tasks: ['copy:testScripts', 'copy:testProject']
            },
            jade: {
                files: '<%= meta.development.jade %>**/*.jade',
                tasks: ['jade:test']
            }
        }
    });

    /**
     * Comandos
     */
    // Inicialização do imagemin para desenvolvimento
    grunt.registerTask('minificarImagem', ['clean:images', 'imagemin']);
    // Teste
    grunt.registerTask('test', ['clean:test', 'copy:test','stylus:test', 'jade:test','watch']);
    // Build
    // grunt.registerTask('build', [
    //     'clean:build',
    //     'copy:build',
    //     'stylus:build',
    //     'uglify:build',
    //     'jade:build',
    //     'usemin',
    //     'htmlcompressor'
    // ]);
};