import React from 'react';
import Footer from './features/footer/Footer';
import Header from './features/header/Header';
import TodosList from './features/todos/TodosList';

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container"> 
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodosList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
