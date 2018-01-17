import * as localforage from 'localforage'

type UserItem = string | null

export interface UserData {
  isValid?: boolean
  url: UserItem
  rootUser: UserItem
}

export async function getUserData(): Promise<UserData> {
  const [url, rootUser] = await Promise.all([
    localforage.getItem<UserItem>('url'),
    localforage.getItem<UserItem>('rootUser')
  ])

  return {
    url,
    rootUser
  }
}

export async function setUserData(userData: UserData): Promise<boolean> {
  console.log('setUserData', userData)
  try {
    await Promise.all([
      localforage.setItem<UserItem>('url', userData.url),
      localforage.setItem<UserItem>('rootUser', userData.rootUser)
    ])
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
