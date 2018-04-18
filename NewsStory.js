import React from 'react';
import Image from 'react-image-resizer';
import PropTypes from 'prop-types';

// API:
// This Component generates a news story formatted as an HTML table.
// It requires the following props:
// 'title' --> the headline for the news story (a string)
// 'sourceName' --> the name of the news source (a string)
// 'description' --> the body or detail of the news story (a string)
// 'urlToImage' --> the url of the image associated with the story (a string)
// 'url' --> the url to the original article
//
// See the propTypes below for further details

const NewsStory = (props) => {
  let secondRow;
  if ((props.urlToImage !== null) && (props.description !== null) && (props.description !== "")) {
    secondRow =
    <tr>
      <td>{props.description}</td>
      <td><Image src={props.urlToImage} alt={props.title} width={150} height={150}/></td>
    </tr>;
  }
  else {
    secondRow = null;
  }

  return (
    <div>
      <a href={props.url}>
        <table>
          <tbody>
            <tr>
              <td className="headline">{props.title}</td>
              <td className="source">{props.sourceName}</td>
            </tr>
            {secondRow}
          </tbody>
        </table>
      </a>
    </div>
  );
}

NewsStory.propTypes = {
  title: PropTypes.string.isRequired,
  sourceName: PropTypes.string.isRequired,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default NewsStory;
