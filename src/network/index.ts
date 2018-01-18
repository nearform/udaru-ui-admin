import axios, { CancelTokenSource } from 'axios'
import { getUserData } from '../user-data'

export interface Settings {
  url: string
  rootUser: string
  isValid: boolean
}

export enum ComponentUnmounted {
  RequestCancelled = 'component unmounted'
}

const getSettings = async (): Promise<Settings> => {
  const userData = await getUserData()
  const { url, rootUser } = userData

  return {
    url: url || '',
    rootUser: rootUser || '',
    isValid: Boolean(userData.url) && Boolean(userData.rootUser)
  }
}

export interface GenericFetchProps<T> {
  redirect?: boolean
  error?: Error | null
  data?: T
}

export const fetchOrganizations = async <T>(
  source: CancelTokenSource
): Promise<GenericFetchProps<T>> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/organizations`
    const headers = {
      authorization: settings.rootUser
    }

    const response = await axios.get(url, {
      headers,
      cancelToken: source.token
    })

    return await response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}
