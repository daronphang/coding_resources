## Permission Denied (13)

- Check permissions of the file/directory.
- Check nginx.conf user and see if it matches with that of file/directory.
- If have SELinux, need perform additional configurations.
- Give Nginx access to filesystem.

```console
$ getenforce                                        # if ENABLED, need perform additional config
$ sudo setsebool -P httpd_can_network_connect on    # enable SELinux httpd_can_network_connect feature
$ chcon -Rt httpd_sys_content_t /path/to/www        # if enforcing

$ setenforce 0    # disable

$ sudo setsebool -P httpd_read_user_content 1       # give nginx access to filesystem for SELinux

$ sudo setsebool -P httpd_enable_homedirs=1
```
```console
$ sudo chmod nginx:nginx directory/or/file
```
