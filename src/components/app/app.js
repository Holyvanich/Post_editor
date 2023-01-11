import React, { Component } from 'react';

import AppHeader from '../app-header/';
import PostStatusFilter from '../post-status-filter';
import SearchPanel from '../search-panel';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

// import styled from 'styled-components';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'WB лучшие', important: false, like: false, id: 1 },
        { label: 'Отличная стажировка', important: false, like: false, id: 2 },
        {
          label: 'На работу бы туда устроиться...',
          important: false,
          like: false,
          id: 3,
        },
      ],
      term: '',
      filter: 'all',
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 4;
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr,
      };
    });
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  }

  onToggle(id, prop) {
    this.setState(({ data }) => {

      const index = data.findIndex((elem) => elem.id === id);
      let newItem = {};
      const old = data[index];
      if (prop === 'like') {
        newItem = { ...old, like: !old.like };
      } else {
        newItem = { ...old, important: !old.important };
      }
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return {
        data: newArr,
      };
    });
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter( ( item ) => {
      return item.label.indexOf(term) > -1
    })
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like)
    } else {
      return items;
    }
  }

  onUpdateSearch(term) {
    this.setState({term})
  }

  onFilterSelect(filter) {
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel
          onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter 
          filter={filter}
          onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          OnDelete={this.deleteItem}
          onToggle={this.onToggle}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
