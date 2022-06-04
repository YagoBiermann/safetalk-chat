#!/bin/sh

arg0=$(basename "$0" .sh)

help()
{
    echo
    echo "Usage example: $arg0 --dev"
    echo
    echo "  {-prod|--production}                  -- Stop production containers"
    echo "  {-dev|--development}                  -- Stop development containers"
    echo "  {-h|--help}                           -- Show this help message and exit"
    exit 0
}


flags()
{
    while [ $# -gt 0 ]; do
        case "$1" in
            -prod | --production )
                [ $# = 0 ] && export PRODUCTION=false
                export PRODUCTION="$1"
                shift;;
            -dev | --development )
                [ $# = 0 ] && export DEVELOPMENT=false
                export DEVELOPMENT="$1"
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

if [ $DEVELOPMENT ]; then
  docker-compose -f ../docker/docker-compose.db.base.yml -f ../docker/docker-compose.dev.yml -f ../docker/docker-compose.base.yml --env-file ../docker/.docker.dev.env -p safetalk down
fi

if [ $PRODUCTION ]; then
  docker-compose -f ../docker/docker-compose.db.base.yml -f ../docker/docker-compose.prod.yml -f ../docker/docker-compose.base.yml --env-file ../docker/.docker.prod.env -p safetalk down
fi
