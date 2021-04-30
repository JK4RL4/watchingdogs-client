import {useEffect, useRef} from 'react';

const functions = {
    useEventListener(eventName, handler, element = window) {
        let savedHandler = useRef();

        useEffect(() => {
            savedHandler.current = handler;
        }, [handler]);

        useEffect(() => {
            let isSupported = element && element.addEventListener;
            if (!isSupported) return;

            let eventListener = event => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                document.removeEventListener(eventName, eventListener);
            };
        }, [eventName, element]);
    },

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      },

      elementObserver(element, classObserved, added, removed) {
        let elemToObserve = document.querySelector(element);
        let prevClassState = elemToObserve.classList.contains(classObserved);
        let observer = new MutationObserver(function(mutations) {
                          mutations.forEach(function(mutation) {
                              if(mutation.attributeName === "class"){
                                  var currentClassState = mutation.target.classList.contains(classObserved);
                                  if(prevClassState !== currentClassState)    {
                                      prevClassState = currentClassState;
                                      if(currentClassState)
                                        added();
                                      else
                                        removed();
                                  }
                              }
                          });
                      });
        observer.observe(elemToObserve, {attributes: true});
      },
      usePrevious (value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        }, [value]);
        return ref.current;
      }
}

export default functions;