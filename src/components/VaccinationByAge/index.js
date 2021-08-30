import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import {VaccinationByAgeContainer, Heading} from './styledComponents'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props
  return (
    <VaccinationByAgeContainer>
      <Heading>Vaccination by age</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="30%"
            data={vaccinationByAgeData}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </PieChart>
      </ResponsiveContainer>
    </VaccinationByAgeContainer>
  )
}

export default VaccinationByAge
