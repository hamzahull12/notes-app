import React from 'react';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      charLimit: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const title = event.target.value;
    const remainingChars = Math.max(0, this.state.charLimit - title.length);

    if (remainingChars < 1) {
      event.preventDefault();
      return;
    }
    if (title.length <= this.state.charLimit) {
      this.setState({
        title: title,
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
    });
  }

   onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.title.trim() === "" || this.state.body.trim() === "") {
      alert("Judul dan catatan tidak boleh kosong!");
      return;
    }

    this.props.addNote(this.state);
    this.setState({
      title: "",
      body: "",
    });
   }

  render() {
    const remainingChars = Math.max(0, this.state.charLimit - this.state.title.length);

    return (
        <div className="note-input">
          <h2>Buat Catatan</h2>
          <p className="note-input__title__char-limit">
            Sisa Karakter: {remainingChars}
          </p>
          <form className="note-input__title" onSubmit={this.onSubmitEventHandler}>
            <input
              type='text'
              id='judul'
              cols="30"
              rows="10"
              placeholder='Masukan Judul....'
              value={this.state.title}
              onChange={this.onTitleChangeEventHandler}/>
              <textarea className="note-input__body" 
                id=""
                placeholder='Masukan Catatan....'
                value={this.state.body}
                onChange={this.onBodyChangeEventHandler}/>
          <button type='submit'>Submit</button>
          </form>
        </div>
    )
  }
}

export default AddNote;
