import styles from './App.module.css';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className={styles.main}>
      <Navbar />
    </div>
  );
}

export default App;
