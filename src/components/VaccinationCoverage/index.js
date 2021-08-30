import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {VaccinationCoverageContainer, Heading} from './styledComponents'

const VaccinationCoverage = props => {
  const {vaccinationCoverageData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <VaccinationCoverageContainer>
      <Heading>Vaccination Coverage</Heading>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={900}
          height={500}
          data={vaccinationCoverageData}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              textAlign: 'center',
              fontFamily: 'Roboto',
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#2d87bb"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </VaccinationCoverageContainer>
  )
}

export default VaccinationCoverage
