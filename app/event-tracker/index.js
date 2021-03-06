import ReactGA from 'react-ga';

import Events from './events';

class EventTracker {
  static init() {
    ReactGA.initialize('UA-123791717-1');
  }

  static raise(eventName, val) {
    const pages = [
      Events.SETTINGS_PAGE,
      Events.HOME_PAGE
    ];
    const apps = [
      Events.INSTALLED,
      Events.INSTALL_REJECTED,
      Events.SHARE_APP,
      Events.SHARE_APP_FAILED,
      Events.COPIED_APP_LINK,
      Events.APP_CRASHED
    ];
    const words = [
      Events.SEARCH_WORD,
      Events.BOOKMARK_WORD,
      Events.SEARCH_WORD_ON_WEB,
      Events.REMOVE_BOOKMARKED_WORD,
      Events.COPY_WORD,
      Events.SHARE_WORD,
      Events.FIND_SYNONYM
    ];

    if (apps.includes(eventName)) {
      ReactGA.event({
        category: 'APP',
        action: eventName,
        ...val ? { label: val } : {}
      });
    } else if (words.includes(eventName)) {
      ReactGA.event({
        category: 'WORDS',
        action: eventName,
        label: val
      });
    } else if (pages.includes(eventName)) {
      ReactGA.pageview(eventName);
    }
  }
}

export default EventTracker;
