import React, { Component } from 'react';
import './post-list-item.css';
export default class Postlistitem extends Component {
  render() {
    const {
      label,
      OnDelete,
      onToggleImportant,
      onToggleLiked,
      important,
      like,
    } = this.props;
    let classNames = 'app-list-item d-flex justify-content-between';
    if (important) {
      classNames += ' important';
    }
    if (like) {
      classNames += ' like';
    }
    return (
      <div className={classNames}>
        <span onClick={onToggleLiked} className="app-list-item-label">
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn-star btn"
            type="button"
            onClick={onToggleImportant}
          >
            <i class="fa-solid fa-star"></i>
          </button>
          <button className="btn-trash btn" type="button" onClick={OnDelete}>
            <i class="fa-solid fa-trash"></i>
          </button>
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    );
  }
}
