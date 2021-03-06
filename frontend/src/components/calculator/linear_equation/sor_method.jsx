import React, { useState } from 'react'
import axios from 'axios'
import MatrixContainer from '../../containers/linear_equation/matrixcontainer'
import ParamInput from '../../containers/parts/paraminput'
import Vector from '../../matrix/vector'
import useSorMethodLinearEquation from '../../../actions/sorMethodLinearEquationAction'

const SorMethodLinearEquation = () => {
  const title = "SOR法"
  const [ status, setStatus ] = useState(false)
  const [ executed, setExecuted ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ solutionVector, setSolutionVector ] = useState([])
  const [iter, setIter] = useState(0)
  const { size, coefficientMatrix, rightHandSideVector, relaxationParameter, changeRelaxationParameterValue } = useSorMethodLinearEquation()

  const execute = async () => {
    setExecuted(false)
    setStatus(false)
    setLoading(true)
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/linear_equation/sor_method`, {
          "size": size,
          "matrix": coefficientMatrix,
          "b": rightHandSideVector,
          "omega": Number.parseFloat(relaxationParameter)
        })

        setStatus(result.data.status === 'SUCCESS')
        setSolutionVector(result.data.ans)
        setIter(result.data.count)
        setExecuted(true)
      } catch (error) {
        setStatus(false)
    }
    setLoading(false)
  }

  return (
    <MatrixContainer
      title={ title }
      execute={ execute }
      status={ status }
      executed={ executed }
      result={
        executed &&
          <Vector
            size={ solutionVector.length }
            values={ solutionVector }
            readOnly={ true }
          />
      }
      loading={ loading }
      iter={
        executed &&
        iter
      }
      setStatus={ setStatus }
      setExecuted={ setExecuted }
      useLinearEquation={ useSorMethodLinearEquation }
    >
      <ParamInput
        label="緩和パラメータ"
        defaultValue={ relaxationParameter }
        handleValue={ changeRelaxationParameterValue }
      />
    </MatrixContainer>
  )
}

export default SorMethodLinearEquation
