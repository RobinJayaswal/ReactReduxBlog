import React from 'react';
import { createPost } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onTitleChange(ev) {
    this.setState({
      title: ev.target.value,
    });
  }

  onTagsChange(ev) {
    this.setState({
      tags: ev.target.value,
    });
  }

  onContentChange(ev) {
    this.setState({
      content: ev.target.value,
    });
  }

  onSubmit() {
    if (this.state.title === '') {
      this.setState({
        showRed: 'title',
      });
      return;
    }

    if (this.state.tags === '') {
      this.setState({
        showRed: 'tags',
      });
      return;
    }

    if (this.state.content === '') {
      this.setState({
        showRed: 'content',
      });
      return;
    }


    this.props.createPost({ title: this.state.title, tags: this.state.tags, content: this.state.content });
  }

  onCancel() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="new-container" >
        <div className="new-header">
          <span>Create A New Post</span>
        </div>
        <div className={`new-input-field ${this.state.showRed === 'title' ? 'red' : ''}`}>
          <input placeholder="title" value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <div className={`new-input-field ${this.state.showRed === 'tags' ? 'red' : ''}`}>
          <input placeholder="tags" value={this.state.tags} onChange={this.onTagsChange} />
        </div>
        <div className={`new-input-field ${this.state.showRed === 'content' ? 'red' : ''}`}>
          <input placeholder="content" value={this.state.content} onChange={this.onContentChange} />
        </div>
        <div className="new-buttons-container">
          <div className="new-form-button submit" onClick={this.onSubmit}>
            <span>Submit</span>
          </div>
          <div className="new-form-button cancel" onClick={this.onCancel}>
            <span>Cancel</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(New);
