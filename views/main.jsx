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
                <form method="POST">
                  <input type="submit" value="up" formaction={'/up/' + filename}></input>
                  <input type="submit" value="down" formaction={'/down/' + filename}></input>
                  <input type="submit" value="delete" formaction={'/delete/' + filename}></input>
                </form>
              </div>
              <a href={href} target="_blank">
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
      </html>
    );
  }
};

module.exports = Main;
