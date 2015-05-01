import React from "react/addons";
import {ToastContainer, ToastMessage} from "react-toastr";

import NavHeaderBar from "./NavHeaderBar";
import ComponentPlayground from "./ComponentPlayground";

const {update} = React.addons;

const ACTIONS = [
  {
    key: "gs",
    displayName: "Getting started",
    path: "#gs",
    component: {
      componentClass: require("./components/GettingStarted"),
      componentRaw: {
        __raw: require("!raw-loader!./components/GettingStarted"),
      },
    },
  },
];

const DROPDOWN_ACTIONS = [
  {
    key: "basics__simple-map",
    displayName: "Simple Map",
    path: "#basics/simple-map",
    component: {
      componentClass: require("./components/basics/SimpleMap"),
      componentRaw: {
        __raw: require("!raw-loader!./components/basics/SimpleMap"),
      },
    },
  },
  {
    key: "basics__geolocation",
    displayName: "Geolocation",
    path: "#basics/geolocation",
    component: {
      componentClass: require("./components/basics/Geolocation"),
      componentRaw: {
        __raw: require("!raw-loader!./components/basics/Geolocation"),
      },
    },
  },
  {
    key: "basics__asynchronous-loading",
    displayName: "Asynchronous Loading",
    path: "#basics/asynchronous-loading",
    component: {
      componentClass: require("./components/basics/AsynchronousLoading"),
      componentRaw: {
        __raw: require("!raw-loader!./components/basics/AsynchronousLoading"),
      },
    },
  },
  {
    key: "basics__directions",
    displayName: "Directions",
    path: "#basics/directions",
    component: {
      componentClass: require("./components/basics/Directions"),
      componentRaw: {
        __raw: require("!raw-loader!./components/basics/Directions"),
      },
    },
  },
  false,
  {
    key: "events__simple-click-event",
    displayName: "Smple click event",
    path: "#events/simple-click-event",
    component: {
      componentClass: require("./components/events/SimpleClickEvent"),
      componentRaw: {
        __raw: require("!raw-loader!./components/events/SimpleClickEvent"),
      },
    },
  },
  {
    key: "events__event-closure",
    displayName: "Using closures in event listeners",
    path: "#events/event-closure",
    component: {
      componentClass: require("./components/events/ClosureListeners"),
      componentRaw: {
        __raw: require("!raw-loader!./components/events/ClosureListeners"),
      },
    },
  },
  {
    key: "events__event-arguments",
    displayName: "Accessing arguments in UI events",
    path: "#events/event-arguments",
    component: {
      componentClass: require("./components/events/AccessingArguments"),
      componentRaw: {
        __raw: require("!raw-loader!./components/events/AccessingArguments"),
      },
    },
  },
  {
    key: "events__event-properties",
    displayName: "Getting properties with event handlers",
    path: "#events/event-properties",
    component: {
      componentClass: require("./components/events/GettingProperties"),
      componentRaw: {
        __raw: require("!raw-loader!./components/events/GettingProperties"),
      },
    },
  },
];

const RIGHT_ACTIONS = [
  {
    key: "geojson",
    displayName: "Geojson",
    path: "#geojson",
    component: {
      componentClass: require("./components/GeojsonToComponents"),
      componentProps: {
        initialGeoJson: require("./geojson"),
      },
      componentRaw: {
        __raw: require("!raw-loader!./components/GeojsonToComponents"),
      },
    },
  },
];

const ALL_ACTIONS = ACTIONS.concat(DROPDOWN_ACTIONS.filter((x) => { return !!x; })).concat(RIGHT_ACTIONS);

const ReactRoot = React.createClass({

  getInitialState () {
    const location = (
      "undefined" !== typeof window && location || {
      }
    );
    const hash = location.hash || ACTIONS[0].path;
    const action = ALL_ACTIONS.filter((action) => { return action.path === hash; })[0];

    return {
      action: action,
    };
  },

  _handle_navigate (action) {
    this.setState({ action });
  },

  _handle_toast (title, message) {
    this.refs.toast.success(title, message);
  },

  render () {
    const {props, state} = this,
          {action} = state;

    return <div id="react-root">
      <NavHeaderBar activeActionKey={action.key} onNavigateTo={this._handle_navigate} actions={ACTIONS} dropdownActions={DROPDOWN_ACTIONS} rightActions={RIGHT_ACTIONS} />

      <div className="container-fluid container--full-height">
        <div className="github-fork-ribbon-wrapper right">
          <div className="github-fork-ribbon" style={{backgroundColor: "#333"}}>
            <a href="https://github.com/tomchentw/react-google-maps">Fork me on GitHub</a>
          </div>
        </div>
        <ToastContainer ref="toast" toastMessageFactory={React.createFactory(ToastMessage.jQuery)}/>

        <ComponentPlayground className="row row--full-height" toast={this._handle_toast} {...action.component} />
      </div>
    </div>;
  }
});

export default ReactRoot;
