import React, { Component } from 'react';
import DropDown from './DropDown.js';
import Image from 'react-image-resizer';
import LoadingMessage from './LoadingMessage.js';
import Aries from './img/Aries.jpg';
import Aquarius from './img/Aquarius.jpg';
import Cancer from './img/Cancer.jpg';
import Capricorn from './img/Capricorn.jpg';
import Gemini from './img/Gemini.jpg';
import Leo from './img/Leo.jpg';
import Libra from './img/Libra.jpg';
import Pisces from './img/Pisces.jpg';
import Sagittarius from './img/Sagittarius.jpg';
import Scorpio from './img/Scorpio.jpg';
import Taurus from './img/Taurus.jpg';
import Virgo from './img/Virgo.jpg';
import starSignDates from './starSignDates.js';

class Horoscope extends Component {
  constructor() {
    super();
    this.state = {images: [
      Aries,
      Taurus,
      Gemini,
      Cancer,
      Leo,
      Virgo,
      Libra,
      Scorpio,
      Sagittarius,
      Capricorn,
      Aquarius,
      Pisces
    ]};
  }

  componentWillMount() {
    this.setState({
      starSigns: this.props.state.starSigns,
      horoscopes: this.props.state.horoscopes,
      selectedIndex: this.props.state.selectedIndex,
      loading: this.props.state.loading
    });
  }

  render() {
    const index = this.state.selectedIndex;
    const starSign = this.state.starSigns[index];
    const horoscope = this.state.horoscopes[index];
    const imageToRender = <Image src={this.state.images[index]} alt={starSign} width={150} height={150} />;
    const horoscopeToRender =
    <table>
    <thead><tr><td className="headline">{starSign}</td><td></td></tr></thead>
      <tbody>
        <tr>
          <td>{horoscope}</td>
          <td>{imageToRender}</td>
        </tr>
      </tbody>
    </table>;
    if (!this.state.loading) {
    return (
      <div>
        <h1>Horoscope</h1>
        <form>
          <div>Star sign:</div>
          <DropDown
            name = "starSignSelection"
            options={this.state.starSigns}
            selected={this.state.starSigns[this.state.selectedIndex]}
            onChange={this.props.handleInputChange}
          />
          <br />
          <br />
          <div>Birth date:</div>
          <DropDown
            options={starSignDates}
            selected={starSignDates[this.state.selectedIndex]}
            onChange={this.props.handleInputChange}
          />
        </form>
        <br />
        <br />
        {horoscopeToRender}
      </div>
    );
  }
  else {
    return (
      <LoadingMessage />
    );
  }
  }
}

export default Horoscope;
