import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from '../utils/axios'

const fields = [
  {
    name: 'My Profile',
    icon: 'person-circle-outline',
    link: '/profile',
    wrapper: Link,
    render: function (
      index,
      field,
      selected,
      setSelected,
      setShowDropDown,
      history
    ) {
      return defaultRender(
        this.wrapper,
        index,
        field,
        selected,
        setSelected,
        setShowDropDown,
        history
      )
    },
    action: null,
  },
  {
    name: 'Group Chat',
    icon: 'people-outline',
    link: '',
    wrapper: 'div',
    render: function (
      index,
      field,
      selected,
      setSelected,
      setShowDropDown,
      history
    ) {
      return defaultRender(
        this.wrapper,
        index,
        field,
        selected,
        setSelected,
        setShowDropDown,
        history
      )
    },
    action: null,
  },
  {
    name: 'Logout',
    icon: 'exit-outline',
    link: '',
    wrapper: 'div',
    render: function (
      index,
      field,
      selected,
      setSelected,
      setShowDropDown,
      history
    ) {
      return defaultRender(
        this.wrapper,
        index,
        field,
        selected,
        setSelected,
        setShowDropDown,
        history
      )
    },
    action: function (history) {
      try {
        localStorage.removeItem('dev-auth-app')
        history.replace('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
]

const defaultRender = (
  Wrapper,
  index,
  field,
  selected,
  setSelected,
  setShowDropDown,
  history
) => {
  return (
    <Wrapper key={index} to={field.link}>
      <div
        className={`${
          field.name === 'Logout'
            ? 'text-red-700 border-t border-gray-300'
            : 'text-gray-700'
        } 
        ${selected === index && 'bg-gray-100 rounded-xl'} 
        flex items-center font-medium my-3 mx-4 px-3 py-1 cursor-pointer`}
        onClick={() => {
          setSelected(index)
          setShowDropDown(false)
          if (field.action) field.action(history)
        }}
      >
        <div className="mr-1">
          <ion-icon size="large" name={field.icon}></ion-icon>
        </div>
        <div>{field.name}</div>
      </div>
    </Wrapper>
  )
}

const Dropdown = ({ setShowDropDown }) => {
  const history = useHistory()
  const [selected, setSelected] = React.useState('')

  return (
    <div className="absolute border shadow-lg rounded-lg bg-white w-64 h-48 mt-5">
      {fields.map((field, index) => {
        return field.render(
          index,
          field,
          selected,
          setSelected,
          setShowDropDown,
          history
        )
      })}
    </div>
  )
}

export default Dropdown
