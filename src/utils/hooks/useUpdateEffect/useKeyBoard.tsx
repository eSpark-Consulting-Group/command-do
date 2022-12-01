import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';
import {useLayoutAnimation} from './useLayoutAnimation';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    // Remove type here if not using TypeScript
    useLayoutAnimation(100);
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    useLayoutAnimation(100);
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};
