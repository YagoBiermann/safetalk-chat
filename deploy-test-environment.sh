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
    echo "  {-u  |--user} user                            -- Set user"
    echo "  {-p  |--password} password                    -- Set password"
    echo "  {-adb|--authenticationDatabase} database      -- Set database to authenticate"
    echo "  {-h  |--help}                                 -- Show this help message and exit"
    exit 0
}

flags()
{
    while [ $# -gt 0 ]; do
        case "$1" in
            -u | --user )
                shift
                [ $# = 0 ] && error "No user specified"
                export USER="$1"
                shift;;
            -p | --password )
                shift
                [ $# = 0 ] && error "No password specified"
                export PWD="$1"
                shift;;
            -adb | --authenticationDatabase )
                shift
                [ $# = 0 ] && error "No authentication database specified"
                export DB="$1"
                shift;;
            -h | --help )
                help;;
        esac
    done
}

if [ -z "$1" ]; then
  help
fi

flags "$@"

docker-compose -f docker-compose.db.base.yml -f docker-compose.db.test.yml --env-file .docker.test.env -p safetalk_test up -d --build
sleep 5
docker exec -d safetalk_db_test mongosh --port 27030 --authenticationDatabase ${DB} -u ${USER} -p ${PWD} --file ./scripts/init-test.js
sleep 5
docker-compose -f docker-compose.test.yml -p safetalk_test up -d --build