const react = require('react');

class Main extends react.Component {
  constructor(props) {
    super(props);
  }

  renderFileList() {
    return (
      <div>
        {this.props.filenames.map(filename => {
          return (
            <div>
              <a href={'/static/' + filename}>filename</a>
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
          <title>photo ranker</title>
        </head>
        <body>
          <h2>files:</h2>
          {this.renderFileList()}
        </body>
      </html>
    );
  }
};

module.exports = Main;
