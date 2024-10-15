
import {Header} from '../../components/Header'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ItemList } from '../../components/ItemList'
import background from '../../assets/background.png'
import { useState } from 'react';
import "./styles.css";
function App() {
  const [user,setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    if(newUser){
      const {avatar_url,name,login,bio} = await newUser;
      setCurrentUser({avatar_url,name,login,bio});
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      if(newRepos.length){
        setRepos(newRepos);
      }
      setUser('');
    }
  }


  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} className='background' alt='background app'/>
        <div className='info'>
          <div>
            <Input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeHolder="@username" />
            <Button label="Buscar" onClick={handleGetData}/>
          </div>
          {currentUser ? ( 
            <>
              <div className='profile'>
                  <img src={currentUser.avatar_url} className='profile-img' alt='imagem de perfil' />
                  <div className='profile-infos'>
                    <h3>{currentUser.name}</h3>
                    <span>@{currentUser.login}</span>
                    <p>{currentUser.bio}</p>
                  </div>
              </div>
              <hr/>
            </>
          ): null}
          {repos?.length ? (
            <div  className='repositorios'>
              <h4>Repositórios</h4>
              {repos.map((repo) => (
                <ItemList title={repo.name} description={repo.description}/>
              ))}
           </div>
          ):null}
        
          </div>
      </div>
    </div>
  );
}

export default App;
