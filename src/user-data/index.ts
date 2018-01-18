import * as localforage from 'localforage'

type Item = string | null

export interface UserData {
  isValid?: boolean
  url: Item
  rootUser: Item
}

export async function getUserData(): Promise<UserData> {
  const [url, rootUser] = await Promise.all([
    localforage.getItem<Item>('url'),
    localforage.getItem<Item>('rootUser')
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
      localforage.setItem<Item>('url', userData.url),
      localforage.setItem<Item>('rootUser', userData.rootUser)
    ])
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
