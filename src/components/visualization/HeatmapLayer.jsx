/* global google */
import React from "react"
import PropTypes from "prop-types"

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from "../../utils/MapChildHelper"

import { MAP, HEATMAP_LAYER } from "../../constants"

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#HeatmapLayer
 */
export class HeatmapLayer extends React.PureComponent {
  static propTypes = {
    /**
     * @type MVCArray<LatLng|WeightedLocation>|Array<LatLng|WeightedLocation>
     */
    defaultData: PropTypes.any,

    /**
     * @type HeatmapLayerOptions
     */
    defaultOptions: PropTypes.any,

    /**
     * @type MVCArray<LatLng|WeightedLocation>|Array<LatLng|WeightedLocation>
     */
    data: PropTypes.any,

    /**
     * @type HeatmapLayerOptions
     */
    options: PropTypes.any,
  }

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  /*
   * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#HeatmapLayer
   */
  constructor(props, context) {
    super(props, context)
    const heatmapLayer = new google.maps.visualization.HeatmapLayer()
    construct(HeatmapLayer.propTypes, updaterMap, this.props, heatmapLayer)
    heatmapLayer.setMap(this.context[MAP])
    this.state = {
      [HEATMAP_LAYER]: heatmapLayer,
    }
  }

  componentDidMount() {
    componentDidMount(this, this.state[HEATMAP_LAYER], eventMap)
  }

  componentDidUpdate(prevProps) {
    componentDidUpdate(
      this,
      this.state[HEATMAP_LAYER],
      eventMap,
      updaterMap,
      prevProps
    )
  }

  componentWillUnmount() {
    componentWillUnmount(this)
    const heatmapLayer = this.state[HEATMAP_LAYER]
    if (heatmapLayer) {
      heatmapLayer.setMap(null)
    }
  }

  render() {
    return false
  }

  /**
   * Returns the data points currently displayed by this heatmap.
   * @type MVCArray<LatLng|WeightedLocation>
   */
  getData() {
    return this.state[HEATMAP_LAYER].getData()
  }
}

export default HeatmapLayer

const eventMap = {}

const updaterMap = {
  data(instance, data) {
    instance.setData(data)
  },

  options(instance, options) {
    instance.setOptions(options)
  },
}
