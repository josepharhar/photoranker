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
            <div>
              <div className="grid-container">
                <h3>#{index + 1}</h3>
                <form method="POST">
                  <input type="submit" value="up" formaction={'/up/' + filename}></input>
                  <input type="submit" value="down" formaction={'/down/' + filename}></input>
                </form>
              </div>
              <a href={href} target="_blank">
                {filename}
                <div className="imgbox"><img src={href}></img></div>
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
          <h2>files:</h2>
          {this.renderFileList()}
        </body>
      </html>
    );
  }
};

module.exports = Main;
