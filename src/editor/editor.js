import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      id: ""
    };
  }

  componentDidMount = () => {
    this.bindEditorWithData();
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.bindEditorWithData();
    }
  };

  bindEditorWithData = () => {
    this.setState({
      title: this.props.selectedNote.title,
      text: this.props.selectedNote.body,
      id: this.props.selectedNote.id
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
          <input
            className={classes.titleInput}
            placeholder="Note title..."
            value={this.state.title?this.state.title:''}
            onChange={e=>this.updateTitle(e.target.value)}
          ></input>
        
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }

  updateTitle = async txt => {
    await this.setState({
      title: txt
    });
    this.update();
  };

  updateBody = async txt => {
    await this.setState({
      text: txt
    });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
