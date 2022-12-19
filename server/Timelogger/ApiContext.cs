using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;

namespace Timelogger
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options)
			: base(options)
		{
		}

		public DbSet<Project> Projects { get; set; }
		public DbSet<Timelog> Timelogs { get; set; }

		//This is to used to replace the database assigned unique IDs
		public int LastProjectId { get; set; }
		public int LastTimelogsId { get; set; }
	}
}
