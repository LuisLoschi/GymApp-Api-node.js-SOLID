import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository {

    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

    save(checkIn: CheckIn): Promise<CheckIn>

    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>

    countByUserId(userId: string): Promise<number>

    findById(checkInId: string): Promise<CheckIn | null>
}