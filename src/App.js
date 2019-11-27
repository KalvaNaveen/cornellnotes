import React from "react";
import EditorComponent from "./editor/editor";
import SidebarCompnent from "./sidebar/sidebar";
import "./App.css";
import { firestore } from "firebase";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {
    return (
      <div className="app-container">
        <SidebarCompnent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          newNote={this.newNote}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
        ></SidebarCompnent>
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          ></EditorComponent>
        ) : null}
        
      </div>
    );
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        this.setState({
          notes: notes
        });
      });
  }

  newNote = async (title) => {
    const note ={
      title:title,
      body:''
    };
    const newIdFromDB =await firebase.firestore().collection('notes').add({
      title:note.title,
      body:note.body,
      createtimeStamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    await this.setState({notes:[...this.state.notes,note]});
    let newNoteIndex = this.state.notes.findIndex(i=>i.id === newIdFromDB.id);
    this.setState({
      selectedNote:this.state.notes[newNoteIndex],
      selectedNoteIndex:newNoteIndex
    })  
  }
 

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    });
  };

  noteUpdate=(id,noteObj)=>{
    firebase.firestore().collection('notes').doc(id).update({
        title:noteObj.title,
        body:noteObj.body,
        updatetimeStamp:firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  deleteNote =async (note) => {

  




    firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();


  };
}

export default App;
