module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp java_and_frontend_project_SDVM-1.0-jar-with-dependencies.jar main.Main'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
						  'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
		        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
			server: {
                files: [
                    'public_html/js/**/*.js', /* ������ �� �������� */
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true /* ������������� �������� */
                }
            }
        },
		concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true 
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('default', ['concurrent']);
	//grunt.registerTask('default', ['shell', 'watch']);	

};