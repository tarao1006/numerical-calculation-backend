import React, { useState } from 'react'
import axios from 'axios'
import MatrixContainer from '../../containers/linear_equation/matrixcontainer'
import Vector from '../../matrix/vector'
import useJacobiMethodLinearEquation from '../../../actions/jacobiMethodLinearEquationAction'

const JacobMethodLinearEquation = () => {
  const title = "ヤコビ法"
  const [ status, setStatus ] = useState(false)
  const [ executed, setExecuted ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ solutionVector, setSolutionVector ] = useState([])
  const [iter, setIter] = useState(0)
  const { size, coefficientMatrix, rightHandSideVector } = useJacobiMethodLinearEquation()

  const execute = async () => {
    setExecuted(false)
    setStatus(false)
    setLoading(true)
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/linear_equation/jacobi_method`, {
          "size": size,
          "matrix": coefficientMatrix,
          "b": rightHandSideVector
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
      loading={ loading }
      result={
        executed &&
          <Vector
            size={ solutionVector.length }
            values={ solutionVector }
            readOnly={ true }
          />
      }
      iter={
        executed &&
        iter
      }
      setStatus={ setStatus }
      setExecuted={ setExecuted }
      useLinearEquation={ useJacobiMethodLinearEquation }
    />
  )
}

export default JacobMethodLinearEquation
