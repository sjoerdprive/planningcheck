-- DropForeignKey
ALTER TABLE "Timeslot" DROP CONSTRAINT "Timeslot_timetableId_fkey";

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
