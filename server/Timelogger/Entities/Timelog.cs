namespace Timelogger.Entities
{
    using System;
    using System.Globalization;
    
	public class Timelog
	{
		public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Description { get; set; }
		public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
		public int TotalTime { get; set; }
	}
}