import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cards from './components/Cards'
import MarketingPlan from './pages/MaketingPlan'
import Drafts from './pages/Histroy'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SocialMedia from './pages/SocialMedia'
import BlogPost from './pages/BlogPost'
import Seo from './pages/Seo'
import Diety from './pages/Diety'
import Email from './pages/Email'
import Funnels from './pages/Funnels'
import Product from './pages/Product'
import Custom from './pages/Custom'
import ViewHisotry from './pages/ViewHisotry'
import Favourites from './pages/Favourites'
import Changelog from './pages/Changelog'
import Pricing from './pages/Pricing'
import PlanCheck from './pages/PlanCheck'
import DocChat from './pages/DocChat'

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact>
          <Landing />
        </Route> */}
        <Route path='/dashboard' exact>
          <Dashboard children={<Cards />} />
        </Route>
        <Route path='/social-media' exact>
          <Dashboard children={<SocialMedia />} />
        </Route>
        <Route path='/blog' exact>
          <Dashboard children={<BlogPost />} />
        </Route>
        <Route path='/seo' exact>
          <Dashboard children={<Seo />} />
        </Route>
        <Route path='/brand' exact>
          <Dashboard children={<Diety />} />
        </Route>
        <Route path='/email' exact>
          <Dashboard children={<Email />} />
        </Route>
        <Route path='/marketing' exact>
          <Dashboard children={<MarketingPlan />} />
        </Route>
        <Route path='/funnels' exact>
          <Dashboard children={<Funnels />} />
        </Route>
        <Route path='/product' exact>
          <Dashboard children={<Product />} />
        </Route>
        <Route path='/custom' exact>
          <Dashboard children={<Custom />} />
        </Route>
        <Route path='/drafts' exact>
          <Dashboard children={<Drafts />} />
        </Route>
        <Route path='/settings' exact>
          <Dashboard children={<Settings />} />
        </Route>
        <Route path='/history' exact>
          <Dashboard children={<Drafts />} />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/view_history' exact>
          <Dashboard children={<ViewHisotry />} />
        </Route>
        <Route path='/favorite' exact>
          <Dashboard children={<Favourites />} />
        </Route>
        <Route path='/changelog' exact>
          <Dashboard children={<Changelog />} />
        </Route>
        <Route path='/pricing' exact>
          <Pricing />
        </Route>
        <Route path='/auth' exact>
          <PlanCheck />
        </Route>
        <Route path='/chat' exact>
          <Dashboard children={<DocChat />} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
