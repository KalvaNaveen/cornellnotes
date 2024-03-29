import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebaritem";


class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }
  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    if (notes)
     {
      return (
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClicked}
            className={classes.newNoteBtn}
          >
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <form>
              <input
              required
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter note title"
                onKeyUp={e => this.updateTitle(e.target.value)}
              />
              <Button
                onClick={this.newNoteSubmit}
                className={classes.newNoteSubmitBtn}
              >
                Submit Note
              </Button>
              </form>
            </div>
          ) : null}
          <List>
            {notes.map((_note, _index) => {
             
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex= {selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}>
                  </SidebarItemComponent>
                </div>
              );
            })}
          </List>
        </div>
      );
    }
    else{
      return (  
      <div className={classes.sidebarContainer}>

      </div>)
    }
  }

  newNoteBtnClicked = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle = txt => {
    this.setState({ title: txt });
  };
  newNoteSubmit = () => {
    this.props.newNote(this.state.title);
    this.setState({title:null,addingNote:false})
  };

  selectNote = (n,i) => this.props.selectNote( n, i)
  deleteNote = (note) => this.props.deleteNote(note);
}

export default withStyles(styles)(SidebarComponent);
