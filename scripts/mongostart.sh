echo "You must install MongoDB First, instructions here: https://docs.mongodb.com/manual/installation/"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo service mongod start
    echo "MondoDB running...."
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mongodb-community
    echo "MondoDB running...."
else
    echo "Error detecting OS, MongoDB Not Started"
fi