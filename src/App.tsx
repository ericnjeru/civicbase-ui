import tw from 'twin.macro'
import './App.css'
import Header from 'components/Header'
import Dashboard from 'pages/dashboard'
import Analytics from 'pages/analytics/Analytics'
import CreateSurvey from 'pages/survey/Create'
import Login from 'pages/login'
import Respondent from 'pages/survey/Respondent'
import FAQs from 'pages/faqs'
import NotFound from 'pages/404'
import Banner from 'components/Banner'

function App() {
  return (
    <div css={tw`h-full overflow-hidden`}>
      <Header />
      <Banner />
      <div css={tw`overflow-y-auto h-full`}>
        <div css={tw`container mx-auto mt-24 mb-12 h-full`}>
          {false && <Dashboard />}
          {false && <Analytics />}
          {false && <CreateSurvey />}
          {false && <Login />}
          {false && <Respondent />}
          {false && <FAQs />}
          {true && <NotFound />}
        </div>
      </div>
    </div>
  )
}

export default App
