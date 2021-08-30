import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import {
  AppContainer,
  CowinDashboardContainer,
  CowinLogoContainer,
  LogoImage,
  LogoText,
  Heading,
  LoadingView,
  FailureView,
  FailureImage,
  FailureText,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = ' https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageData={vaccinationData.last7DaysVaccination}
        />

        <VaccinationByGender
          vaccinationByGenderData={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeData={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderFailureView = () => (
    <FailureView>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <FailureText>Something went wrong</FailureText>
    </FailureView>
  )

  renderLoadingView = () => (
    <LoadingView data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </LoadingView>
  )

  renderBasedApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStats()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContainer>
        <CowinDashboardContainer>
          <CowinLogoContainer>
            <LogoImage
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <LogoText>Co-WIN</LogoText>
          </CowinLogoContainer>
          <Heading>CoWIN Vaccination in India</Heading>
          {this.renderBasedApiStatus()}
        </CowinDashboardContainer>
      </AppContainer>
    )
  }
}
export default CowinDashboard
