import React, { useReducer } from 'react'
import './assets/css/App.css'
import './assets/css/GothamPro.css'
import { BrowserRouter as Router, Route, Switch, IndexRoute, Redirect} from 'react-router-dom'
import BookPick from './pages/BookPickPage'
import ReadingPage from './pages/ReadingPage'
import Context from './Context'
import PreloaderReducer from './reducers/PreloaderReducer'
import BooksReducer from './reducers/BookReducer'
import StopWordsReducer from './reducers/StopWords'
import Login from './pages/Login'
import BookForReading from './reducers/BookForReading'
import UserReducer from './reducers/UserReducer'
import UserBooks from './reducers/UserBooks'
import TeacherPage from './pages/TeacherPage'

function App() {
  const [loader, dispathPreloader] = useReducer(PreloaderReducer, false)
  const [books, booksDispatch] = useReducer(BooksReducer, [])
  const [stopWords, stopWordsDispatch] = useReducer(StopWordsReducer, [])
  const [bookForReading, bookForReadingDispatch] = useReducer(BookForReading)
  const [user, userDispatch] = useReducer(UserReducer)
  const [userBooks, userBooksDispatch] = useReducer(UserBooks)

  return (
    <Context.Provider value = {{
      loaderState: loader,
      loaderDispatch: dispathPreloader,
      books: books,
      booksDispatch: booksDispatch,
      stopWords: stopWords,
      stopWordsDispatch: stopWordsDispatch,
      bookForReading: bookForReading,
      bookForReadingDispatch: bookForReadingDispatch,
      user: user,
      userDispatch: userDispatch,
      userBooks: userBooks,
      userBooksDispatch: userBooksDispatch
    }}>
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/" render = {() => {
            return <Redirect to = "/Login"/>
          }} />
          <Route path="/Login" component = { Login }/>
          <Route path="/BookPick" component = { BookPick }/>
          <Route path="/ReadingPage" component = { ReadingPage } />
          <Route path="/Teacher" component = { TeacherPage }/>
        </Switch>
      </Router> 
    </div>
    </Context.Provider>
  );
}

export default App;
