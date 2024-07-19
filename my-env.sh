#!/bin/bash
THIS_DIR=$(dirname $(realpath "${BASH_SOURCE[0]}"))

# <NVM-RELATED>
export XDG_CONFIG_HOME="${THIS_DIR}"

export NVM_DIR="${THIS_DIR}/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


if [ -e '.nvmrc' ] && [[ $(type -t nvm) == "function" ]]; then
    nvm use
else
    if [ -e "${THIS_DIR}/.nvm/versions/node" ]; then
        # Note: nvm use will re-set up these env vars
        _NVM_DIR=$(ls -trd "${THIS_DIR}/.nvm/versions/node"/v?.*.* | sort | tail -n 1)
        export NVM_INC="${_NVM_DIR}/include/node"
        export NVM_BIN="${_NVM_DIR}/bin"
    fi
fi
# </NVM-RELATED>

PATH="${THIS_DIR}/node_modules/.bin:${PATH}"  # for npm-installed tools

