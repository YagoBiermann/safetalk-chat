#!/bin/sh

arg0=$(basename "$0" .sh)


usage()
{
    exec 1>2
    help
    exit 1
}

error()
{
    echo "$arg0: $*" >&2
    exit 1
}

help()
{
    echo
    echo "Usage example: $arg0 --user johnDoe --password STR0N5P4SS --authenticationDatabase admin"
    echo
    echo "  {-u|--user} user                         -- Set user"
    echo "  {-p|--password} password                 -- Set password"
    echo "  {-d|--authenticationDatabase} database   -- Set database to authenticate"
    echo "  {-h|--help}                              -- Print this help message and exit"
    exit 0
}

flags()
{
    while test $# -gt 0
    do
        case "$1" in
        (-u|--user)
            shift
            [ $# = 0 ] && error "No user specified"
            export USER="$1"
            shift;;
        (-p|--password)
            shift
            [ $# = 0 ] && error "No password specified"
            export PWD="$1"
            shift;;
        (-d|--authenticationDatabase)
            shift
            [ $# = 0 ] && error "No authentication database specified"
            export DB="$1"
            shift;;
        (-h|--help)
            help;;
        (*) help;;
        esac
    done
}

flags "$@"

if [ -z "$@" ]; then
    help
fi

docker-compose -f docker-compose.dev.yml --env-file .docker.dev.env -p safetalk up -d
sleep 5
docker exec -d safetalk_db mongosh --port 27017 --authenticationDatabase ${DB} -u ${USER} -p ${PWD} --file ./scripts/init.js
sleep 15
docker restart safetalk_server