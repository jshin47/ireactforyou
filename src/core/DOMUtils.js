import React from 'react';


export function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent(`on${event}`, listener);
  }
}

export function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent(`on${event}`, listener);
  }
}

export function deepCopyElementWithStyleAndClassNameAndProps(element: React.Element, P: Object): React.Element {

  if (P.style && element.props.style) {
    P.style = {
      ...element.props.style, ...P.style
    }
  }

  if (P.className && element.props.className) {
    P.className = `${element.props.className} ${P.className}`
  }

  return React.cloneElement(element, P)

}


export function cloneElement(element: React.Element, props: Object): React.Element {
  if (props.style && element.props.style) {
    props.style = {...element.props.style, ...props.style};
  }
  if (props.className && element.props.className) {
    props.className = `${element.props.className} ${props.className}`;
  }
  return React.cloneElement(element, props);
};
