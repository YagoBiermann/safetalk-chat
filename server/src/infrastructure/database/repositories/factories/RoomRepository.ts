import RoomMapper from '../../mapper/RoomMapper'
import RoomRepository from '../RoomRepository'

class RoomRepositoryFactory {
  private constructor() {}
  public static make(): RoomRepository {
    const roomMapper = new RoomMapper()
    return new RoomRepository(roomMapper)
  }
}

export default RoomRepositoryFactory
