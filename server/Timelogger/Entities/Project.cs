namespace Timelogger.Entities
{
	using System;
    using System.Globalization;

	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime Deadline { get; set; }
		public int TotalHours { get; set; }
		public bool IsCompleted { get; set; } 
	}
}
