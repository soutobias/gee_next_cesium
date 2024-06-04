'use client'

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import axios from 'axios'

interface ContextHandleContextType {
  loading: boolean
  setLoading: (loading: boolean) => void
  showFlash: boolean
  setShowFlash: (showFlash: boolean) => void
  flashMessage: {
    messageType: string
    content: string
    duration?: number
  }
  setFlashMessage: (flashMessage: {
    messageType: string
    content: string
    duration?: number
  }) => void
  listLayers: any
}

const ContextHandleContext = createContext<
  ContextHandleContextType | undefined
>(undefined)

interface ContextHandleProviderProps {
  children: ReactNode
}

export const ContextHandleProvider: React.FC<ContextHandleProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  const [showFlash, setShowFlash] = useState(false)
  const [flashMessage, setFlashMessage] = useState({
    messageType: '',
    content: '',
  })
  const [listLayers, setListLayers] = useState<any>([])

  useEffect(() => {
    if (flashMessage.messageType) {
      setShowFlash(true)
    }
  }, [flashMessage])

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get('/layers.json')
    const data = await response.data
    setListLayers(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContextHandleContext.Provider
      value={{
        loading,
        setLoading,
        showFlash,
        setShowFlash,
        flashMessage,
        setFlashMessage,
        listLayers,
      }}
    >
      {children}
    </ContextHandleContext.Provider>
  )
}

export const useContextHandle = (): ContextHandleContextType => {
  const context = useContext(ContextHandleContext)
  if (!context) {
    throw new Error(
      'useContextHandle must be used within a ContextHandleProvider',
    )
  }
  return context
}
