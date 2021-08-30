import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import {VaccinationByGenderContainer, Heading} from './styledComponents'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  return (
    <VaccinationByGenderContainer>
      <Heading>Vaccination by gender</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="60%"
            data={vaccinationByGenderData}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
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
    </VaccinationByGenderContainer>
  )
}

export default VaccinationByGender
