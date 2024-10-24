DIR="$( cd "$( dirname "$0" )/../packages" && pwd )"
echo $DIR
for sub in uikit-chat-hooks uikit-react-native uikit-react-native-foundation uikit-utils; do
  (cd "$DIR/$sub" && yalc publish)
done