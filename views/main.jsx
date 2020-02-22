// TODO why does this have to specifically be named "React"
const React = require('react');

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFileList() {
    return (
      <div>
        {this.props.filenames.map((filename, index) => {
          const href = '/images/' + filename;
          return (
            <div className="box">
              <div>
                <div className="title">#{index + 1}</div>
                <div>
                  <button className="up">up</button>
                  <button className="down">down</button>
                  <button className="delete">delete</button>
                </div>
              </div>
              <a href={href} target="_blank" className="filename">
                {filename}
                <img src={href}></img>
              </a>
            </div>
          );
        })};
      </div>
    );
  }

  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/static/style.css"></link>
          <title>photo ranker</title>
        </head>
        <body>
          {this.renderFileList()}
        </body>
        <script src="/static/frontend.js"></script>
      </html>
    );
  }
};

module.exports = Main;
